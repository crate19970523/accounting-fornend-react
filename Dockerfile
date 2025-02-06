FROM nginx
COPY dist/ /opt/crater-account-frontend/
COPY nginx.conf /etc/nginx/conf.d