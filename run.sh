#!/bin/bash
docker run -d -p 8089:8089 -v `pwd`/public:/usr/src/app/public cs-source-file-server
