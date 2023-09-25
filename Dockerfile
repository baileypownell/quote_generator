FROM denoland/deno

EXPOSE 8000

COPY server .
# necessary for cache command below

WORKDIR /app

ADD . /app

RUN deno cache server/server.ts 
# The cache command downloads & compiles

# the CMD command runs when you run 'docker compose up'
CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./server/server.ts"] 