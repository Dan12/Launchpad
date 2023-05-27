FROM ruby:2.2.1

WORKDIR /opt/Launchpad

COPY . .
RUN bundle install \
  && ruby bin/rake db:migrate RAILS_ENV=development
  
ENTRYPOINT ["ruby"]
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
EXPOSE 3000/tcp
