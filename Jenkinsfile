@Library(['GlobalJenkinsLibrary@2', 'PlatformJenkinsLibrary']) _

env.NODE_VERSION = '12 --lts'
env.DOCKER_REPOSITORY = 'registry.tools.adidas-group.com'
env.DOCKER_CREDENTIALS = 'docker-secret'
env.K8S_CREDENTIALS = 'k8s-secret'
env.K8S_NAMESPACE = 'test-app'

node {
    meta.pipelines.withDefaults()

    checkout scm

    String projectName = tools.npm.getConfig 'name'
    String version = tools.npm.getConfig 'version'

    env.DOCKER_IMAGE = "1/${projectName}"

    stage 'Build', platform.npmBuild()

    if (env.BRANCH_NAME == 'master') {
        stage 'Publish', platform.dockerPublish(tags: [ 'latest', version ])

        stage 'Deploy', platform.k8sDeploy(
            file: './deploy/all.yml',
            variables: [
                "TAG=${version}",
                'CLUSTER_URL=dev-blue.he.k8s.emea.adsint.biz'
            ]
        )
    }
}
