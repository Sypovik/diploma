#!/bin/bash

NAME=reactnative

docker build -t $NAME .

docker run -u 1000 --name $NAME -h $NAME -p 80:80 -p 4000:4000 -p 8081:8081 -p 5037:5037 --rm -i -t -v ./:/app $NAME