from fabric.api import run, env, cd


env.hosts = ['45.32.110.118']
env.user = 'root'
env.key_filename = 'C:\Users\sen\.ssh\\vps'


def deploy():
    run('pwd')
    with cd('/opt/node_blog_system'):
        run('pwd')
        run('git checkout master')
        run('git pull origin master')
        run('git checkout deploy')
        run('git merge master')
        run('pm2 reload www')


def test():
    run('pwd')
    with cd('/opt/node_blog_system'):
        run('pwd')
        run('git checkout master')
        run('git pull origin master')
        run('git checkout test')
        run('git merge master')
        run('env -i PORT=3100 node bin/www')

# 部署 fab deploy
# 测试 fab test
