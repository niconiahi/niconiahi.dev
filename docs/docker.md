// Start docker service locally
sudo systemctl start docker

// List volumes
docker volume ls

// Add user to Docker group
sudo usermod -aG docker niconiahi

// Turn off and delete all volumes and containers
docker-compose down -v

// Turn on volumes and containers (-d is daemon running background)
docker-compose up -d