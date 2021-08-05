#!/usr/bin/env bash

NEW_VERSION=$(cat version)
blocklet version $NEW_VERSION
git add blocklet.yml
