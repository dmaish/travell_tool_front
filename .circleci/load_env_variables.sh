#!/usr/bin/env bash

ROOT_DIR=$(pwd)

source $ROOT_DIR/.circleci/utils.sh

require PRODUCTION_ANDELA_AUTH_HOST $PRODUCTION_ANDELA_AUTH_HOST
require PRODUCTION_AUTH_REDIRECT_URL $PRODUCTION_AUTH_REDIRECT_URL
require PRODUCTION_API_URL $PRODUCTION_API_URL
require PRODUCTION_CITY $PRODUCTION_CITY
require PRODUCTION_CLOUNDINARY_API $PRODUCTION_CLOUNDINARY_API
require PRODUCTION_PRESET_NAME $PRODUCTION_PRESET_NAME
require PRODUCTION_ALL_USERS $PRODUCTION_ALL_USERS
require PRODUCTION_DEFAULT_LOCATION $PRODUCTION_DEFAULT_LOCATION
require PRODUCTION_BUGSNAG_API_KEY $PRODUCTION_BUGSNAG_API_KEY
require PRODUCTION_JWT_PUBLIC_KEY $PRODUCTION_JWT_PUBLIC_KEY

require STAGING_ANDELA_AUTH_HOST $STAGING_ANDELA_AUTH_HOST
require STAGING_AUTH_REDIRECT_URL $STAGING_AUTH_REDIRECT_URL
require STAGING_API_URL $STAGING_API_URL
require STAGING_CITY $STAGING_CITY
require STAGING_CLOUNDINARY_API $STAGING_CLOUNDINARY_API
require STAGING_PRESET_NAME $STAGING_PRESET_NAME
require STAGING_ALL_USERS $STAGING_ALL_USERS
require STAGING_DEFAULT_LOCATION $STAGING_DEFAULT_LOCATION
require STAGING_BUGSNAG_API_KEY $STAGING_BUGSNAG_API_KEY
require STAGING_JWT_PUBLIC_KEY $STAGING_JWT_PUBLIC_KEY

require TESTING_ANDELA_AUTH_HOST $TESTING_ANDELA_AUTH_HOST
require TESTING_AUTH_REDIRECT_URL $TESTING_AUTH_REDIRECT_URL
require TESTING_API_URL $TESTING_API_URL
require TESTING_CITY $TESTING_CITY
require TESTING_CLOUNDINARY_API $TESTING_CLOUNDINARY_API
require TESTING_PRESET_NAME $TESTING_PRESET_NAME
require TESTING_ALL_USERS $TESTING_ALL_USERS
require TESTING_DEFAULT_LOCATION $TESTING_DEFAULT_LOCATION
require TESTING_BUGSNAG_API_KEY $TESTING_BUGSNAG_API_KEY
require TESTING_JWT_PUBLIC_KEY $TESTING_JWT_PUBLIC_KEY

if [ "$1" == 'test' ]; then
  export REACT_APP_ANDELA_AUTH_HOST=$TESTING_ANDELA_AUTH_HOST
  export REACT_APP_AUTH_REDIRECT_URL=$TESTING_AUTH_REDIRECT_URL
  export REACT_APP_API_URL=$TESTING_API_URL
  export REACT_APP_CITY=$TESTING_CITY
  export REACT_APP_CLOUNDINARY_API=$TESTING_CLOUNDINARY_API
  export REACT_APP_PRESET_NAME=$TESTING_PRESET_NAME
  export REACT_APP_ALL_USERS=$TESTING_ALL_USERS
  export REACT_APP_DEFAULT_LOCATION=$TESTING_DEFAULT_LOCATION
  export REACT_APP_BUGSNAG_API_KEY=$TESTING_BUGSNAG_API_KEY
  export REACT_APP_JWT_PUBLIC_KEY=$TESTING_JWT_PUBLIC_KEY
elif [ "$CIRCLE_BRANCH" == 'master' ]; then
  export REACT_APP_ANDELA_AUTH_HOST=$PRODUCTION_ANDELA_AUTH_HOST
  export REACT_APP_AUTH_REDIRECT_URL=$PRODUCTION_AUTH_REDIRECT_URL
  export REACT_APP_API_URL=$PRODUCTION_API_URL
  export REACT_APP_CITY=$PRODUCTION_CITY
  export REACT_APP_CLOUNDINARY_API=$PRODUCTION_CLOUNDINARY_API
  export REACT_APP_PRESET_NAME=$PRODUCTION_PRESET_NAME
  export REACT_APP_ALL_USERS=$PRODUCTION_ALL_USERS
  export REACT_APP_DEFAULT_LOCATION=$PRODUCTION_DEFAULT_LOCATION
  export REACT_APP_BUGSNAG_API_KEY=$PRODUCTION_BUGSNAG_API_KEY
  export REACT_APP_JWT_PUBLIC_KEY=$PRODUCTION_JWT_PUBLIC_KEY
else
  export REACT_APP_ANDELA_AUTH_HOST=$STAGING_ANDELA_AUTH_HOST
  export REACT_APP_AUTH_REDIRECT_URL=$STAGING_AUTH_REDIRECT_URL
  export REACT_APP_API_URL=$STAGING_API_URL
  export REACT_APP_CITY=$STAGING_CITY
  export REACT_APP_CLOUNDINARY_API=$STAGING_CLOUNDINARY_API
  export REACT_APP_PRESET_NAME=$STAGING_PRESET_NAME
  export REACT_APP_ALL_USERS=$STAGING_ALL_USERS
  export REACT_APP_DEFAULT_LOCATION=$STAGING_DEFAULT_LOCATION
  export REACT_APP_BUGSNAG_API_KEY=$STAGING_BUGSNAG_API_KEY
  export REACT_APP_JWT_PUBLIC_KEY=$STAGING_JWT_PUBLIC_KEY
fi


generateEnvFile(){
     cat <<EOF
REACT_APP_ANDELA_AUTH_HOST=$REACT_APP_ANDELA_AUTH_HOST
REACT_APP_AUTH_REDIRECT_URL=$REACT_APP_AUTH_REDIRECT_URL
REACT_APP_API_URL=$REACT_APP_API_URL
REACT_APP_CITY=$REACT_APP_CITY
REACT_APP_CLOUNDINARY_API=$REACT_APP_CLOUNDINARY_API
REACT_APP_PRESET_NAME=$REACT_APP_PRESET_NAME
REACT_APP_ALL_USERS=$REACT_APP_ALL_USERS
REACT_APP_DEFAULT_LOCATION=$REACT_APP_DEFAULT_LOCATION
REACT_APP_BUGSNAG_API_KEY=$REACT_APP_BUGSNAG_API_KEY
REACT_APP_JWT_PUBLIC_KEY=$REACT_APP_JWT_PUBLIC_KEY
EOF
}


generateEnvFile > $ROOT_DIR/.env
