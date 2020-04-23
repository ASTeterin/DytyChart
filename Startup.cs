using dutyChart.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace dutyChart
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;   
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices( IServiceCollection services )
        {
            //var str2 = Configuration["MyKey"];
            //string connectionString = "Server=.\\SQLEXPRESS;Database=workersdb;Trusted_Connection=True;";
            string connectionString = Configuration["ConnectionString"];
            services.AddDbContext<ApplicationContext>( options => options.UseSqlServer( connectionString ) );
            services.AddScoped<DataProcessor>();

            services.AddMvc();
        }

        public void Configure( IApplicationBuilder app, IHostingEnvironment env )
        {
            if ( env.IsDevelopment() )
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware( new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                } );
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
