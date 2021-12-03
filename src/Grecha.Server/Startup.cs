using Grecha.Server.Hubs;
using Grecha.Server.Models.API;
using Grecha.Server.Services;
using Grecha.Server.Services.Interfaces;
using grechaserver.Infrastructure;
using grechaserver.Middleware;
using grechaserver.Services;
using grechaserver.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;

namespace grechaserver
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(_configuration.GetSection(nameof(AppSettings)));

            services.AddDbContext<GrechaDBContext>(options =>
                options.UseNpgsql(_configuration.GetConnectionString(nameof(GrechaDBContext))));

            services.AddTransient<IImageService, ImageService>();

            services.AddControllersWithViews(options =>
            {
                options.InputFormatters.Insert(0, new BinaryInputFormatter());
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            services.AddSwaggerGen(setupAction =>
            {
                setupAction.SwaggerDoc("v1", new OpenApiInfo { Title = "Grecha API", Version = "v1" });
            });
            // signalr
            services.AddSingleton<IChannelWriterService<MeasureInfo>, ChannelWriterService<MeasureInfo>>();
            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            }).AddMessagePackProtocol(options =>
            {
                options.SerializerOptions.WithResolver(MessagePack.Resolvers.StandardResolver.Instance);
            }).AddJsonProtocol();

            services.AddHostedService<SimulationService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // apply ef migrations
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var dbcontext = scope.ServiceProvider.GetRequiredService<GrechaDBContext>();
                dbcontext.Database.Migrate();
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            // global cors policy (not secure)
            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                .AllowCredentials()); // allow credentials

            app.UseRouting();
            // swagger
            app.UseSwagger(setupAction =>
            {
                setupAction.RouteTemplate = "/swagger/{documentName}/swagger.json";
            });
            app.UseSwaggerUI(setupAction =>
            {
                setupAction.SwaggerEndpoint($"/swagger/v1/swagger.json", $"Grecha API");
            });
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapHub<ClientHub>("/hub");
            });
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
