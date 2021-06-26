﻿using System;
using System.Net;

namespace Arina
{

    class usernameMode
    {
        static public void Start(string username)
        {

            Console.WriteLine($"\nProfiles of {username}:");
            if (username.Contains(" "))
            {

                string[] parts = username.Split(" ");
                Console.WriteLine("Username contains space, which separator to use? (_|.|none|another character)");
                string sep = Console.ReadLine();
                //Заполнение пробелов
                username = "";
                int i = 0;
                if (i + 2 == parts.Length)
                {
                    username += parts[i] + sep + parts[i + 1];
                    Console.WriteLine(username);
                }
                for (i = 0; i < parts.Length - 2; i++)
                {
                    username += parts[i] + sep;


                    if (i + 1 >= parts.Length - 2)
                    {
                        username += parts[i + 1] + sep + parts[i + 2];
                    }

                }

                Console.WriteLine("Username: " + username);
            }

            github_username.Check(username);
            tg_username.Check(username);
            akniga_username.Check(username);
            blogger_username.Check(username);
            reddit_username.Check(username);
            pikabu_username.Check(username);
            vk_username.Check(username);
            tt_username.Check(username);
            pinterest_username.Check(username);
            twitch_username.Check(username);
            yt_username.Check(username);
            fb_username.Check(username);
            habr_username.Check(username);
            spotif_username.Check(username);
            ya_music_username.Check(username);
            ebay_username.Check(username);
            ph_userame.Check(username);
            archive_is_username.Check(username);




        }
    }

    #region UsernameCheckClasses
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
            catch { Console.WriteLine("[-] Telegram : NOT FOUND"); }

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
            catch { Console.WriteLine("[-] Blogger : NOT FOUND"); }
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
            catch { Console.WriteLine("[-] Reddit : NOT FOUND"); }
        }
    }


    class archive_is_username
    {
        public static void Check(string username)
        {
            Console.WriteLine($"[+] ArchiveIs : http://archive.is/search/?text={username}");
        }
    }

    class vk_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://m.vk.com/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] VK : NOT FOUND");
                }
                else { Console.WriteLine($"[+] VK : https://vk.com/{username}"); }
            }
            catch { Console.WriteLine("[-] VK : NOT FOUND"); }
        }
    }

    class pikabu_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"http://pikabu.ru/@{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Pikabu : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Pikabu : http://pikabu.ru/@{username}"); }
            }
            catch { Console.WriteLine("[-] Pikabu : NOT FOUND"); }
        }
    }

    class akniga_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"http://akniga.org/profile/{username}/";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Akniga : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Akniga : http://akniga.org/profile/{username}/"); }
            }
            catch { Console.WriteLine("[-] Akniga : NOT FOUND"); }
        }
    }


    class pinterest_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.pinterest.com/{username}/_saved/";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    Console.WriteLine("[-] Pinterest : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Pinterest : https://www.pinterest.com/{username}/_saved/"); }
            }
            catch { Console.WriteLine("[-] Pinterest : NOT FOUND"); }
        }
    }


    class yt_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.youtube.com/user/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode != HttpStatusCode.OK)
                {
                    Console.WriteLine("[-] YouTube : NOT FOUND");
                }
                else { Console.WriteLine($"[+] YouTube : https://www.youtube.com/user/{username}"); }
            }
            catch { Console.WriteLine("[-] YouTube : NOT FOUND"); }
        }
    }

    class fb_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.facebook.com/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] FaceBook : NOT FOUND");
                }
                else { Console.WriteLine($"[+] FaceBook : https://www.facebook.com/{username}"); }
            }
            catch { Console.WriteLine("[-] FaceBook : NOT FOUND"); }
        }
    }

    class ya_music_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://music.yandex.ru/users/{username}/playlists";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] YandexMusic : NOT FOUND");
                }
                else { Console.WriteLine($"[+] YandexMusic : https://music.yandex.ru/users/{username}/playlists"); }
            }
            catch { Console.WriteLine("[-] YandexMusic : NOT FOUND"); }
        }
    }

    class spotif_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://open.spotify.com/user/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Spotify : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Spotify : https://open.spotify.com/user/{username}"); }
            }
            catch { Console.WriteLine("[-] Spotify : NOT FOUND"); }
        }
    }


    class habr_username
    {
        //
        public static void Check(string username)
        {
            try
            {
                string url = $"https://habr.com/ru/users/{username}/";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Habr : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Habr : https://habr.com/ru/users/{username}/"); }
            }
            catch { Console.WriteLine("[-] Habr : NOT FOUND"); }
        }
    }

    class twitch_username
    {
        //
        public static void Check(string username)
        {
            try
            {
                string url = $"https://m.twitch.tv/{username}?desktop-redirect=true";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] Twitch : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Twitch : https://m.twitch.tv/{username}"); }
            }
            catch { Console.WriteLine("[-] Twitch : NOT FOUND"); }
        }
    }

    class ph_userame
    {
        //
        public static void Check(string username)
        {
            try
            {
                string url = $"https://rt.pornhub.com/users/{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] PornHub : NOT FOUND");
                }
                else { Console.WriteLine($"[+] PornHub : https://rt.pornhub.com/users/{username}"); }
            }
            catch { Console.WriteLine("[-] PornHub : NOT FOUND"); }
        }
    }

    class tt_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.tiktok.com/@{username}";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.UserAgent = "Mozilla / 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit / 537.36";
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                if (response.StatusCode == HttpStatusCode.NotFound)
                {
                    Console.WriteLine("[-] TikTok : NOT FOUND");
                }
                else { Console.WriteLine($"[+] TikTok : https://www.tiktok.com/@{username}"); }
            }
            catch { Console.WriteLine("[-] TikTok : NOT FOUND"); }
        }
    }
    class ebay_username
    {
        public static void Check(string username)
        {
            try
            {
                string url = $"https://www.ebay.com/usr/{username}";
                WebClient wc = new WebClient();
                string response = wc.DownloadString(url);
                if (!response.Contains($"data-url=\"https://www.ebay.com/usr/{username}\""))
                {
                    Console.WriteLine("[-] Ebay : NOT FOUND");
                }
                else { Console.WriteLine($"[+] Ebay : https://www.ebay.com/usr/{username}"); }
            }
            catch { Console.WriteLine("[-] Ebay : NOT FOUND"); }
        }
    }




    #endregion

}
