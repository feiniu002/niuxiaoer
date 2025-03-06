FROM nginx:latest

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制配置文件
COPY conf.d/default.conf /etc/nginx/conf.d/
COPY ssl/* /etc/nginx/ssl/

# 设置适当的权限
RUN chmod 644 /etc/nginx/conf.d/default.conf \
    && chmod 600 /etc/nginx/ssl/*