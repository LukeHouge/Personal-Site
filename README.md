# Personal Site [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/N0422FmVZ)
My own personal landing page and portfolio to display my work and photography.

## Structure and Workflow
 - Created on mac using Coda and VS Code
 - Served on an Ubuntu 18 LTS Server VM (virtualized on an ESXi host in my homelab) running a LAMP (Linux, Apache, mySQL, Php) stack.
 - Utilizing git for version control, commiting changes to a seperate branch and issuing a pull request to deploy changes.
 - Then leveraging TeamCity running on a personal server providing CI/CD services listening for commits to the master branch, upload the repository to an internal network facing machine temp folder over SFTP, and then issue scp commands via ssh to transfer those files internally to the web server itself, which is closed to all traffic but web.
