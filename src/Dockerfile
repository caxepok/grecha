FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Grecha.Server/Grecha.Server.csproj", "Grecha.Server/"]
RUN dotnet restore "Grecha.Server/Grecha.Server.csproj"
COPY . .
WORKDIR "/src/dashserver"
RUN apt update -y
RUN apt install npm -y
RUN dotnet build "Grecha.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Grecha.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Grecha.Server.dll"]