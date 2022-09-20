#!/usr/bin/env bash

init: install dep
	@echo "Initializing the repo..."

install:
	@echo "Install software required for this repo..."

dep:
	@echo "Install dependencies required for this repo..."
	@lerna bootstrap
	@lerna link

test:
	@echo "Running test suites..."

build:
	@echo "Building the software..."


github-init:
	@make dep
