# Install [Docker]
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install the Docker packages (latest)
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin


# Create Demo [image]  (hello-world)
# pull docker image
sudo docker pull hello-world

# Verify that the Docker Engine installation is successful by running the hello-world image.
sudo docker run hello-world 

# view running containers
docker ps -la
      or
docker ps -a

# remove container
docker rm <id>

# remove all containers
docker ps -q | xargs docker stop


# Create the docker [group] if it does not exist
  $ sudo groupadd docker
# Add your user to the docker group.
  $ sudo usermod -aG docker $USER
# Log in to the new docker group (to avoid having to log out / log in again; but if not enough, try to reboot):
  $ newgrp docker
# Check if docker can be run without root
  $ docker run hello-world
# Reboot if still got error
  $ reboot

# [postgress] Demo
# run postgress on docker
docker run \
  -p 5432:5432 \
  --name test \
  -e POSTGRES_PASSWORD=password \
  -d postgres
  
<!-- 
 same as above
# run pg-admin
docker run   -p 5050:80   -e "PGADMIN_DEFAULT_EMAIL=name@example.com"   -e "PGADMIN_DEFAULT_PASSWORD=admin"   -d dpage/pgadmin4 
-->

# check what's running on 5432
    $ lsof -i tcp:5432
        or
    sudo ss -lptn 'sport = :5432'

# kill process on port 5432
    $ kill -9 <pid>

    sudo vi /var/lib/pgsql9/data/postgresql.conf

# check network names
$ docker network ls
    verify psql (ps-sql_default), pg-admin(ps-sql_pg_network) and pg_network.

# check which host is exposed potgress db under Gateway
    $ docker network inspect pg_network
# if pg_network not found, create one
    $ docker network create pg_network

# run [psql] in [docker]
  1. find psql container name (docker ps -a)
  2. docker exec -it <container-name> psql -U <username> <database-name>
          e.g: docker exec -it ps-sql-postgres-1 psql -U hussain test
     psql terminal is available via docker


# Start daemon
  navigate to folder with docker-compose.yml file
  $ docker compose up -d