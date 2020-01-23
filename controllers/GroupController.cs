using dutyChart.Models;
using Microsoft.AspNetCore.Mvc;

namespace dutyChart.Controllers
{
    [Route( "api/Group" )]
    public class GroupController : Controller
    {
        ApplicationContext db;

        public GroupController( ApplicationContext context )
        {
            db = context;
        }


    }
}
