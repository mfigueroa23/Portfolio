# Stage 1: compute CSP hashes for inline scripts and lock down file permissions.
FROM perl:5-slim AS csp
COPY dist/devsonic.cl/browser /site
COPY nginx.conf docker/csp-hashes.pl /work/
RUN perl /work/csp-hashes.pl /site /work/nginx.conf \
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
