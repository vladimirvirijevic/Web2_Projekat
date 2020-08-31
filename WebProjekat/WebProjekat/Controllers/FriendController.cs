using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebProjekat.Data;
using WebProjekat.Models;
using WebProjekat.Requests.Friend;

namespace WebProjekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IHttpContextAccessor _httpContextAccessor;

        public FriendController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        [HttpGet("getUsers")]

        public async Task<IEnumerable<User>> GetUsers()
        {

            return await _context.Users.ToListAsync();

        }
        [HttpPost("searchUsers")]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsers([FromBody] SearchFriendRequest request)
        {
            List<User> users = new List<User>();

            if (request.Ime == "" && request.Prezime == "")
            {
                users = await _context.Users.Where(x => x.Role == "User").ToListAsync();
            }
            else if (request.Ime == "")
            {
                users = await _context.Users.Where(x => x.LastName.Contains(request.Prezime)).ToListAsync();
            }
            else if (request.Prezime == "")
            {
                users = await _context.Users.Where(x => x.FirstName.Contains(request.Ime)).ToListAsync();
            }
            else
            {
                users = await _context.Users.Where(x => x.FirstName.Contains(request.Ime) && x.LastName.Contains(request.Prezime)).ToListAsync();
            }

            return Ok(users);


        }
        [HttpPost("addFriend/{userId}")]
        public async Task<IActionResult> AddFriend(int userId, [FromBody] AddFriendRequest request) { 

           
            
            if (request.FirstName == "" || request.LastName == "")
            {
                return BadRequest();
            }

            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];

            if (currentUser == null && currentUser.Id != userId)
            {
                return BadRequest();
            }
            var  user = await _context.Users.FirstOrDefaultAsync(x => x.Id==request.UserId);

            var friend = await _context.Friends.FirstOrDefaultAsync(x => x.KoJeRezervisao.Id==userId);
            if(friend!=null)
            {
                if(friend.KoJePrihvatio.LastName==request.LastName)
                {
                    return BadRequest();
                }
            }


            FriendModel fm = new FriendModel();
            fm.FriendFirstName = request.FirstName;
            fm.FriendLastName = request.LastName;
            fm.KoJeRezervisao = currentUser;
            fm.DaLiJePrihvacen = false;
            fm.KoJePrihvatio = user;


            _context.Friends.Add(fm);
            await _context.SaveChangesAsync();


            return Ok();

        }
        [HttpGet("getNotAddedFriends/{userId}")]
        public async Task<IEnumerable<FriendModel>> GetNonAddedFriends(int userId)
        {
          
           var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];
            

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId && x.Role=="User");


            var friends = await _context.Friends.Where(x =>x.KoJePrihvatio.Id==user.Id && x.DaLiJePrihvacen == false).ToListAsync();
            return friends;
        }
        [HttpPut("acceptFriend/{nonFriendId}")]
        public async Task<IActionResult> AcceptFriend(int nonFriendId, [FromBody] AcceptFriendRequest request)
        {
          
            if(nonFriendId==0)
            {
                return BadRequest();
            }

            var nonFriend = await _context.Friends.FirstOrDefaultAsync(x => x.Id == nonFriendId && x.DaLiJePrihvacen==false);
            if(nonFriend==null)
            {
                return BadRequest();
            }

            nonFriend.DaLiJePrihvacen = true;
            

            await _context.SaveChangesAsync();

            return Ok();
        }
        [HttpGet("getAddedFriends/{userId}")]
        public async Task<IEnumerable<FriendModel>> GetAddedFriends(int userId)
        {
            List<FriendModel> ffp = new List<FriendModel>();
          
            var users = await _context.Users.Where(x => x.Role == "User").ToListAsync();
            var currentUser = (User)_httpContextAccessor.HttpContext.Items["User"];
            var friends= await _context.Friends.Where(x => x.DaLiJePrihvacen == true).ToListAsync();
            var friends1 = await _context.Friends.Where(x =>  x.DaLiJePrihvacen == true && x.KoJeRezervisao.Id==currentUser.Id).ToListAsync();
            var friends2= await _context.Friends.Where(x => x.DaLiJePrihvacen == true && x.KoJePrihvatio.Id == currentUser.Id).ToListAsync();
            foreach (FriendModel f in friends)
            {
                if(f.KoJePrihvatio.Id==currentUser.Id)
                {

                     ffp = friends2;
                    
                }
                else 
                {
                    ffp = friends;
                }
                

            }
            return ffp;
            
        }

        [HttpDelete("declineNonFriend/{nonFriendId}")]
        public async Task<IActionResult> DeclineNonFriend(int nonFriendId)
        {
            if (nonFriendId == 0)
            {
                return BadRequest();
            }
            var nonFriend = await _context.Friends.FirstOrDefaultAsync(x => x.Id == nonFriendId && x.DaLiJePrihvacen == false);
            if (nonFriend == null)
            {
                return BadRequest();
            }

            _context.Friends.Remove(nonFriend);
            await _context.SaveChangesAsync();

            return Ok();

        }
        [HttpDelete("deleteFriend/{friendId}")]
        public async Task<IActionResult> DeleteFriend(int friendId)
        {
            if (friendId == 0)
            {
                return BadRequest();
            }
            var friend = await _context.Friends.FirstOrDefaultAsync(x => x.Id == friendId && x.DaLiJePrihvacen == true);
            if (friend == null)
            {
                return BadRequest();
            }

            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();

            return Ok();

        }

    }
    }