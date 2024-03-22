FROM reactnativecommunity/react-native-android 

RUN apt update -y && \ 
    apt upgrade -y && \
    mkdir /app
RUN npm install -g npm@10.5.0
RUN npm install --global @expo/ngrok@^4.1.0

WORKDIR /app

EXPOSE 80
EXPOSE 4000
EXPOSE 8081

RUN useradd -ms /bin/bash nikita
USER nikita