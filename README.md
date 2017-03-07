# Counter Strike: Source Static File Server

A Simple static file server to use as an external download server for CS:Source

# Prerequisites
1. Docker CE (Community Edition) Runtime, which can be found [here](https://docs.docker.com/engine/installation/). You can use Docker on most operating systems.

## Optional Prerequisites (for Development)
1. NodeJS (tested on v6.10.0, but should work on any version 6.x)

# Usage
**Note: All instructions are written for Linux systems, including filepaths. You will need to adjust accordingly for Windows Machines**.
## Simple
These steps assume you will pull the pre-built docker image.

1. In the terminal, run `docker pull tugayac/cs-source-file-server`. This will get the latest Docker image from Docker Hub. [You can see the available versions](https://hub.docker.com/r/tugayac/cs-source-file-server/tags/), if you don't want the latest version.
1. Go to "Shared Steps".

## Advanced
These steps assume you will build the docker image on your machine. Note, it requires NodeJS and NPM to be installed.

1. Clone this Repository.
1. In the terminal, run `npm run dockerize`. This will create the docker image.
1. Go to "Shared Steps".

## Shared Steps
1. Go to a folder where you would like to create a folder called `public`. Inside this folder, create another folder, called `cstrike`.
1. Use the `run.sh` file [provided in this repository](https://github.com/tugayac/cs-source-file-server/blob/master/run.sh) to start the docker container. You can either execute the contents directly or download and run that bash script.
  1. Let's break down what that run script is doing:
  ```
  docker run -d -p 8089:8089 -v `pwd`/public:/usr/src/app/public tugayac/cs-source-file-server
  ```
  The `-d` means it will run in detached mode, i.e. in the background. 
  
  `-p 8089:8089` means that the host (your computer) will be able to access port 8089 on the container, at port 8089. The mapping takes this format: `-p <host-computer-port>:<container-port>`. So you can change `<host-computer-port>` to any free port on your computer.

  In ```-v `pwd`/public:/usr/src/app/public```, the `pwd` command returns the current directory this command is being executed in. So if you're running the command from the `/Users/username/Documents/server` directory, the computer interprets this part as `-v /Users/username/Documents/server/public:/usr/src/app/public`. You can replace `pwd` with any path you want or run the script from the directory where your `public` folder is located. This part with the `-v` essentially links the directory named public to the directory INSIDE the container, at `/usr/src/app/public`. So whatever you place in the `/Users/username/Documents/server/public` directory will be picked up by the static file server.
  
  The last part of the command `tugayac/cs-source-file-server` signifies that a new container should be created from this image.
1. Once you've figured out which pathway to expose to your container, run the command above to start the docker container. Mine looks like this:
  ```
  docker run -d -p 8089:8089 -v /Users/username/Documents/server/public:/usr/src/app/public tugayac/cs-source-file-server
  ```
1. In the terminal, run `docker ps`. You should see something like this. If you do, your container is running successfully!
  ```
  CONTAINER ID        IMAGE                           COMMAND             CREATED             STATUS              PORTS                    NAMES
  c6b4b94bb5c0        tugayac/cs-source-file-server   "node bundle.js"    11 minutes ago      Up 11 minutes       0.0.0.0:8089->8089/tcp   pedantic_babbage
  ```
1. Place All the maps, assets, nav files, etc in the `public/cstrike` directory you created. The folder structure must be the same as it is in the CS:S installation directory. So for example, the maps go into the folder `public/cstrike/maps`, and so on.
1. To test that it's working, go to http://localhost:8089/cstrike/maps/your-map-filename.bsp. If a file is downloading successfully, all is good!

# Troubleshooting
## Accessing Logs
You may access the logs to see who has made a request to your file server. To do that, first run `docker ps`. That should give you an output like the following:
```
CONTAINER ID        IMAGE                           COMMAND             CREATED             STATUS              PORTS                    NAMES
c6b4b94bb5c0        tugayac/cs-source-file-server   "node bundle.js"    11 minutes ago      Up 11 minutes       0.0.0.0:8089->8089/tcp   pedantic_babbage
```
Copy the "ID" under the column "Container ID". Again in the terminal, run `docker logs -f c6b4b94bb5c0`. This will display the logs as requests come to your server. Make a request to your server and see more output! In fact, it'll look like this:
```
Listening on port 8089
::ffff:172.17.0.1 - - [07/Mar/2017:04:31:04 +0000] "GET /public/cstrike HTTP/1.1" - - "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
::ffff:172.17.0.1 - - [07/Mar/2017:04:31:05 +0000] "GET /favicon.ico HTTP/1.1" - - "http://localhost:8089/public/cstrike" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
```
## Port Forwaring
TODO
