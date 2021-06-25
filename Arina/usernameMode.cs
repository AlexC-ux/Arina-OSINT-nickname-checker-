using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.IO;

namespace Arina
{
    class usernameMode
    {
        static public void Start(string username)
        {
            Console.WriteLine("Loading...");
            
            
            github_username.Check(username);
            twitter_username.Check(username);
            tg_username.Check(username);
            blogger_username.Check(username);
            reddit_username.Check(username);


            Console.WriteLine("Completed!");
        }
    }

    class github_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://api.github.com/users/{username}/events/public";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] GitHub : NOT FOUND");
                }
                else { Console.WriteLine($"[+] GitHub : https://github.com/{username}"); }
            }
            catch { Console.WriteLine("[-] GitHub : NOT FOUND"); }
        }
    }

    class twitter_username
    {
        public static void Check(string username)
        {
            try
            {
                Console.WriteLine($"[+] Twitter : https://web.archive.org/web/2020*/twitter.com/{username}");
            }
            catch (Exception ex){ Console.WriteLine(ex.ToString()); }
        }
    }

    class tg_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://t.me/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.ResponseUri.ToString() != $"https://t.me/{username}")
                {
                    Console.WriteLine("[-] Telegram : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Telegram : https://t.me/{username}"); }
            }
            catch { }
            
        }
    }

    class blogger_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"http://{username}.blogspot.com";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Blogger : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Blogger : http://{username}.blogspot.com"); }
            }
            catch { }
        }
    }

    class reddit_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.reddit.com/user/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Reddit : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Reddit : https://www.reddit.com/user/{username}"); }
            }
            catch { }
        }
    }

    class webarch_login
    {
        public static void Check(string username)
        {
            Console.WriteLine($"[+] WebArchive : https://google.com/?q=site:https://web.archive.org/web/+intext:{username}");
        }
    }

    class vk_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.reddit.com/user/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Reddit : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Reddit : https://www.reddit.com/user/{username}"); }
            }
            catch { }
        }
    }
}
