FROM reactnativecommunity/react-native-android 

RUN apt update -y && \ 
    apt upgrade -y && \
    # npm install -g npm@10.5.0 -y\
    mkdir /app


WORKDIR /app

EXPOSE 80
EXPOSE 4000

RUN useradd -ms /bin/bash nikita
USER nikita