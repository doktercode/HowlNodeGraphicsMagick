let imagePath = 'images/image.jpg'
let animationImagePath = 'images/animation_image.gif[0]'


var fs = require('fs')
    , gm = require('gm');

// resize and remove EXIF profile data
gm(imagePath)
    .resize(240, 240)
    .noProfile()
    .write('resize1.png', function (err) {
        if (!err) console.log('done');
    });

// some files would not be resized appropriately
// http://stackoverflow.com/questions/5870466/imagemagick-incorrect-dimensions
// you have two options:
// use the '!' flag to ignore aspect ratio
gm(imagePath)
    .resize(240, 240, '!')
    .write('resize2.png', function (err) {
        if (!err) console.log('done');
    });

// use the .resizeExact with only width and/or height arguments
gm(imagePath)
    .resizeExact(240, 240)
    .write('resize3.png', function (err) {
        if (!err) console.log('done');
    });

// obtain the size of an image
gm(imagePath)
    .size(function (err, size) {
        if (!err)
            console.log(size.width > size.height ? 'wider' : 'taller than you');
    });

// output all available image properties
gm(imagePath)
    .identify(function (err, data) {
        if (!err) console.log(data)
    });

// pull out the first frame of an animated gif and save as png
gm(animationImagePath)
    .write('resize4.png', function (err) {
        if (err) console.log('aaw, shucks');
    });

// auto-orient an image
gm(imagePath)
    .autoOrient()
    .write('resize5.jpg', function (err) {
        if (err) console.log(err)
    })

// crazytown
gm(imagePath)
    .flip() //뒤집기
    .magnify()//사진 확대
    .rotate('green', 45) //각도
    .blur(7, 3) // 블러효과
    .crop(300, 300, 150, 130) // 사진자르기 시작 값 끝나는 값
    .edge(3) // 필터효과
    .write('resize6.jpg', function (err) {
        if (!err) console.log('crazytown has arrived');
    })

// annotate an image
gm(imagePath)
    .stroke("#ffffff")
    .drawCircle(10, 10, 20, 10)
    .font("Helvetica.ttf", 12)
    .drawText(30, 20, "GMagick!")
    .write("reszie7.jpg", function (err) {
        if (!err) console.log('done');
    });

// creating an image
gm(200, 400, "#ddff99f3")
    .drawText(10, 50, "from scratch")
    .write("resize8.jpg", function (err) {
        // ...
    });