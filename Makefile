all:
  $(error please pick a target)

dockerBuild:
  docker build --force-rm --no-cache -t ruty-deploy .

run:
	docker-compose up ruty