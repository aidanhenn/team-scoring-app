#!/bin/bash
set -e  # Exit on error

# Update package lists and install Chromium (without sudo)
apt-get update
apt-get install -y chromium

# Install dependencies using npm ci (ensures exact package versions)
npm ci
