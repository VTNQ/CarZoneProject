using server.Data;

namespace server.Services
{
    public interface ShowroomService
    {
        public bool createShowroom(AddShowroom addShowroom);
        public Task<dynamic> showShowroom();
        public bool updateShowroom(int id, UpdateShowroom updateShowroom);

        
    }
}
