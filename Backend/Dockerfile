FROM openjdk:15-alpine
EXPOSE 8080
ADD target/prueba-docker.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]