#coding=utf8
from fabric.api import run, env, cd, lcd, put
from fabric.operations import local
from fabric.context_managers import prefix
from fabric.context_managers import path

env.hosts = ['root@likangwei.com']
SUPERVISOR_NAME = "fly"


workDir = "/Users/likangwei/go/src/fly-fe"
deployDir = "/var/www/fly"

PATH = "/usr/lib/go-1.9/bin/" 

commitMsg = ""

tgzFile = "fly-fe.tar.gz"

def build():
    with lcd(workDir):
        local("npm run build")
        local("pwd")
        local("tar -czf %s dist" % tgzFile)
        put(tgzFile, deployDir)


def deploy():
    build()
    with cd(deployDir):
        run("tar -xzf fly-fe.tar.gz")
