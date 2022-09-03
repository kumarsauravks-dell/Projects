using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"select * from Employee";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        public string Post(Employee emp)
        {
            try
            {
                string query = @"insert into Employee values('" 
                +emp.EmployeeName +"','"
                +emp.Department+"','"
                +emp.DateOfJoining+"','"
                +emp.PhotoFileName+"')";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added Successfully";
            }
            catch (Exception ex)
            {
                return "Failed to Add";
            }
        }
        public string Put(Employee emp)
        {
            try
            {
                string query = @"update Employee set 
                EmployeeName='" + emp.EmployeeName + @"',
                Department='" +emp.Department + @"',
                DateOfJoining='" + emp.DateOfJoining + @"',
                PhotoFileName='" + emp.PhotoFileName + @"'
                where EmployeeId=" + emp.EmployeeId;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Updated Successfully";
            }
            catch (Exception ex)
            {
                return "Failed to Update";
            }
        }
        public string Delete(Employee emp)
        {
            try
            {
                string query = @"delete from Employee where EmployeeId=" + emp.EmployeeId;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted Successfully";
            }
            catch (Exception ex)
            {
                return "Failed to Delete";
            }
        }
        [Route("api/Employee/DeleteEmployee")]
        [HttpPost]
        public string DeleteEmployee(Employee emp)
        {
            try
            {
                string query = @"delete from Employee where EmployeeId=" + emp.EmployeeId;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Deleted Successfully";
            }
            catch (Exception ex)
            {
                return "Failed to Delete";
            }
        }

        [Route("api/Employee/GetAllDepartments")]
        [HttpGet]
        public HttpResponseMessage GetAllDepartmentNames()
        {
            try
            {
                string query = @"select DepartmentName from Department";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return Request.CreateResponse(HttpStatusCode.OK,table);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable,ex);
            }
        }
        [Route("api/Employee/SaveFile")]
        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/"+fileName);
                postedFile.SaveAs(physicalPath);

                return fileName;
            }
            catch (Exception ex)
            {
                //throw;
                return "annonymous.png";
            }
        }
    }
}
