pip install --user awscli
export PATH=$PATH:$HOME/.local/bin

aws ecs update-service --cluster $CLUSTER_NAME --service event --force-new-deployment
aws ecs update-service --cluster $CLUSTER_NAME --service message-queue --force-new-deployment
aws ecs update-service --cluster $CLUSTER_NAME --service notification --force-new-deployment
aws ecs update-service --cluster $CLUSTER_NAME --service direction-record --force-new-deployment
aws ecs update-service --cluster $CLUSTER_NAME --service geometry --force-new-deployment