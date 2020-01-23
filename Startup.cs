using dutyChart.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace dutyChart
{
    public class Startup
    {
        public void ConfigureServices( IServiceCollection services )
        {
            string connectionString = "Server=.\\SQLEXPRESS;Database=workersdb;Trusted_Connection=True;";
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
