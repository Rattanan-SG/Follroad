pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

add-apt-repository ppa:eugenesan/ppa
apt-get update
apt-get install jq -y

curl https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy | sudo tee -a /usr/bin/ecs-deploy
sudo chmod +x /usr/bin/ecs-deploy

ecs-deploy -c $CLUSTER_NAME -n event -i $DOCKER_HUB_USER/follroad-event:latest --skip-deployments-check --force-new-deployment
ecs-deploy -c $CLUSTER_NAME -n message-queue -i $DOCKER_HUB_USER/follroad-message-queue:latest --skip-deployments-check --force-new-deployment
ecs-deploy -c $CLUSTER_NAME -n notification -i $DOCKER_HUB_USER/follroad-notification:latest --skip-deployments-check --force-new-deployment
ecs-deploy -c $CLUSTER_NAME -n direction-record -i $DOCKER_HUB_USER/follroad-direction-record:latest --skip-deployments-check --force-new-deployment
ecs-deploy -c $CLUSTER_NAME -n geometry -i $DOCKER_HUB_USER/follroad-geometry:latest --skip-deployments-check --force-new-deployment