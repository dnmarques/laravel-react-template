<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ config('app.name') }}</title>

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link rel="shortcut icon" type="image/png" href="{{ asset('img/favicon.png') }}"/>
    </head>
    <body>
        <div class="relative bg-white overflow-hidden lg:h-screen">
            <div class="max-w-7xl mx-auto h-full">
                <div class="flex items-center flex-col lg:flex-row z-10 mb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 h-full">
                    <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div class="sm:text-center lg:text-left">
                            <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span class="inline">It's</span>
                                <span class="text-red-600 inline">working<span class="text-gray-900 inline">!</span></span>
                            </h1>
                            <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">{{ $text }}</p>
                        </div>
                        <div class="flex flex-row flex-1 justify-start gap-6 mt-4">
                            <a href="{{$loginUrl}}" class="text-blue-500 hover:text-blue-800 hover:underline">Login</a>
                            <a href="{{$registerUrl}}" class="text-blue-500 hover:text-blue-800 hover:underline">Register</a>
                        </div>
                    </main>
                    <div class="lg:hidden">
                        <img class="h-96 w-full object-cover lg:w-full lg:h-full" src="{{ asset('img/image.png') }}" alt="">
                    </div>
                </div>
            </div>
            <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="{{ asset('img/image.png') }}" alt="">
            </div>
        </div>
    </body>
</html>
