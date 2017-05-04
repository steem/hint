#!/bin/bash

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

find . -name "*.md" \
       -not -path "./node_modules/*" \
       -not -path "./dist/*" \
       -not -path "./coverage/*" \
    | xargs awesome_bot \
        --allow-dupe \
        --allow-redirect \
        --set-timeout 150 \
        --white-list "example1.com,example2.com,example3.com"
