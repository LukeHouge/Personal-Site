# Personal Site 
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/N0422FmVZ)
[![Build Status](https://travis-ci.org/LukeHouge/Personal-Site.svg?branch=master)](https://travis-ci.org/LukeHouge/Personal-Site)
[![Coverage Status](https://coveralls.io/repos/github/LukeHouge/Personal-Site/badge.svg?branch=dev)](https://coveralls.io/github/LukeHouge/Personal-Site?branch=dev)

My own personal landing page and portfolio to display my work and photography.

![LH logo](https://raw.githubusercontent.com/LukeHouge/Personal-Site/master/logo.png)

## Structure and Workflow
 - Created on mac using Coda and VS Code
 - Served on an Ubuntu 18 LTS Server VM (virtualized on an ESXi host in my homelab) running a LAMP (Linux, Apache, mySQL, Php) stack with Node.js acting as the main backend language over Php.
 - Utilizing git for version control, commiting changes to a seperate branch and issuing a pull request to deploy changes.
 - Then leveraging TeamCity running on a personal server providing CI/CD services listening for commits to the master branch, running some tests on the node files, and then issuing a git pull if all tests are pased.
