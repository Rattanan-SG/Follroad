pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

add-apt-repository ppa:eugenesan/ppa
apt-get update
apt-get install jq -y

curl https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy | sudo tee -a /usr/bin/ecs-deploy
sudo chmod +x /usr/bin/ecs-deploy

docker login --username $DOCKER_HUB_USER --password $DOCKER_HUB_PSW

docker build -t haoliangyu/ecs-auto-deploy ./back-end/ExternalEventService
docker tag haoliangyu/ecs-auto-deploy:latest $IMAGE_REPO_URL:latest

ecs-deploy -c $CLUSTER_NAME -n $SERVICE_NAME -i $IMAGE_REPO_URL:latest