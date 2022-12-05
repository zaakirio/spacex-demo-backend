#!/bin/bash

docker-compose -p example -f common.yml up --build --remove-orphans --abort-on-container-exit
