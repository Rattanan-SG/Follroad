pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

add-apt-repository ppa:eugenesan/ppa
apt-get update
apt-get install jq -y

curl https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy | sudo tee -a /usr/bin/ecs-deploy
sudo chmod +x /usr/bin/ecs-deploy

ecs-deploy -c $CLUSTER_NAME -n external-event -i $DOCKER_HUB_USER/follroad-external-event:latest --skip-deployments-check
ecs-deploy -c $CLUSTER_NAME -n notification -i $DOCKER_HUB_USER/follroad-notification:latest --skip-deployments-check