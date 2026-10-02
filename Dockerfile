# Stage 1: set the API origin in the CSP, compute hashes for inline scripts and lock down
# file permissions. API_URL must match the one used by `pnpm build`; an empty value (unset CI
# secret) falls back to production.
FROM perl:5-slim AS csp
ARG API_URL=https://api.figueroa-sanchez.com
COPY dist/devsonic.cl/browser /site
COPY nginx.conf docker/csp-hashes.pl /work/
# Only scheme://host[:port] reaches nginx.conf, so the value can't inject CSP directives.
RUN API_ORIGIN=$(perl -e '$ARGV[0] =~ m{^(https?://[A-Za-z0-9.-]+(?::[0-9]+)?)(?:/.*)?$} or die "invalid API_URL\n"; print $1' "${API_URL:-https://api.figueroa-sanchez.com}") \
 && sed -i "s|__API_ORIGIN__|$API_ORIGIN|" /work/nginx.conf \
 && perl /work/csp-hashes.pl /site /work/nginx.conf \
 && find /site -type d -exec chmod 0555 {} + \
 && find /site -type f -exec chmod 0444 {} +

# Stage 2: unprivileged nginx serving the static build.
FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/* /etc/nginx/templates /usr/share/nginx/html/*
COPY --from=csp /work/nginx.conf /etc/nginx/nginx.conf
COPY --from=csp --chown=root:root /site /usr/share/nginx/html
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
