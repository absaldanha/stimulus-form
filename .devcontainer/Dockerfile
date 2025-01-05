ARG NODE_VERSION=22
FROM mcr.microsoft.com/devcontainers/typescript-node:$NODE_VERSION

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt --fix-broken install
RUN --mount=type=cache,id=dev-apt-cache,target=/var/cache/apt,sharing=locked \
  --mount=type=cache,id=dev-apt-lib,target=/var/lib/apt,sharing=locked \
  apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  google-chrome-stable
