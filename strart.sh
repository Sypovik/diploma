#!/bin/bash

NAME=reactnative

docker build -t $NAME .

docker run -u 1000 --name $NAME -p 80:80 -p 4000:4000 --rm -i -t -v ./:/app $NAME