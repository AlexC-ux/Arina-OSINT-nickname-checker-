using System;
using System.IO;

namespace Arina
{
    class Program
    {
        static void Main(string[] args)
        {
            
            Console.Title = "Arina checker";
            Console.WriteLine("Select mode:\n            1 - username");
            Console.WriteLine("            \n            2 - usernames list (.txt)");
            string mode = Console.ReadLine();
            switch (mode)
                {
                case "1":
                    Console.WriteLine("\n            username:");
                    string target = Console.ReadLine();
                    usernameMode.Start(target);
                    break;
                case "2":
                    Console.WriteLine("\n            path:");
                    target = Console.ReadLine();
                    string[] usernames = File.ReadAllLines(target);
                    foreach (string username in usernames)
                    {
                        usernameMode.Start(username);
                    }
                    break;
                
                }
                
                
        }
    }
}
