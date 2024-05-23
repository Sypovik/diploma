FROM reactnativecommunity/react-native-android 

RUN apt update -y && \ 
    apt upgrade -y && \
    mkdir -p /app/view
RUN npm install -g npm@10.5.0
RUN npm install -g expo@50.0.14
RUN npm install --global @expo/ngrok@^4.1.0
RUN npm install --global @react-navigation/native
RUN npm install --global @react-navigation/stack
RUN npm install --global install react-native-web react-dom @expo/metro-runtime react-native-screens react-native-safe-area-context react-native-gesture-handler
RUN npm install --global formik
RUN npm install --global @react-native-community/voice --save
RUN npm install --global eas-cli



WORKDIR /app/view

EXPOSE 80
EXPOSE 4000
EXPOSE 8081
EXPOSE 5037

RUN useradd -ms /bin/bash nikita
USER nikita

# CMD ["npx expo install react-native-web react-dom @expo/metro-runtime react-native-screens react-native-safe-area-context react-native-gesture-handler"]