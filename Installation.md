# Installation

## Install on Docker

The easiest way to install the Launchpad on your won server is by using docker.

```bash
# First, clone the repository
git pull https://github.com/Dan12/Launchpad.git
cd Launchpad

# Next, prepare and build the Image
docker build -t launchpad:master

# Now you can run your image like any other and enjoy the launchpad!
docker run \
  --name launchpad \
  --detach \
  -p 3000:3000 \
  launchpad:master
```
