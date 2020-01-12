using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dutyChart.Models;
using Microsoft.AspNetCore.Mvc;

namespace dutyChart.controllers
{
    [Route("api/Group")]
    public class GroupController: Controller
    {
        ApplicationContext db;

        public GroupController(ApplicationContext context)
        {
            db = context;
        }


    }
}
