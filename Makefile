#!/usr/bin/env bash

dep:
	@echo "Install dependencies required for this repo..."
	@npm install
	@npm install -g @abtnode/cli

test:
	@echo "Running test suites..."

build:
	@echo "Building the software..."

bundle:
	@echo "Bundling the software..."
	@npm run bundle

github-init:
	@make dep

include .makefiles/*.mk
