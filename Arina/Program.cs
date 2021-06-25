using System;

namespace Arina
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "Arina checker";
            Console.WriteLine("Select mode:\n            1 - username");
            string mode = Console.ReadLine();
            Console.WriteLine("\n            username:");
            string target = Console.ReadLine();
            switch (mode)
                {
                case "1":
                    usernameMode.Start(target);
                    break; 
                
                }
                
                
        }
    }
}
