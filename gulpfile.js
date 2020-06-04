let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let cssmin = require("gulp-clean-css");
let uglify = require("gulp-uglify");
let sass = require("gulp-sass"); 


   gulp.task("copy-all",async ()=>{
       gulp.src("./src/**/*").pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan"));
   });
//function htmlDo(){
//	gulp.src("./src/*.html")
//		.pipe(htmlmin({
//			collapseWhitespace:true,
//			removeEmptyAttributes:true,
//			removeComments:true,
//			minifyJS:true,
//			minifyCSS:true
//		}))
//		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan"));
//}
//
//function cssDo(){
//	gulp.src("./src/css/*.css")
//		.pipe(cssmin())
//		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\css"));
//}
//function jsDo(){
//	gulp.src("./src/js/*.js")
//		.pipe(uglify())
//		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\js"));
//}
//
//function phpDo(){
//	gulp.src("./src/php/**/*")
//	.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\php"));
//}
//function imgDo(){
//	gulp.src("./src/img/**/*")
//	.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\img"));
//}
//function scssDo(){
//	gulp.src("./src/scss/*.scss")
//	.pipe(sass())
//	.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\css"));
//}
gulp.task("default",async()=>{
	gulp.watch("./src/*.html",async()=>{
		gulp.src("./src/*.html")
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeEmptyAttributes:true,
			removeComments:true,
			minifyJS:true,
			minifyCSS:true
		}))
		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan"));
	})
	gulp.watch("./src/css/*.css",async()=>{
		gulp.src("./src/css/*.css")
		.pipe(cssmin())
		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\css"));
	})
	gulp.watch("./src/js/*.js",async()=>{
		gulp.src("./src/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\js"));
	})
})
//	htmlDo();
//	cssDo();
//	jsDo();
//	phpDo();
//	imgDo();
//	scssDo();
//	gulp.watch("./src/*.html",async()=>{
//		htmlDo();
//	})
//	gulp.watch("./src/css/*.css",async()=>{
//		cssDo();
//	})
//	gulp.watch("./src/js/*.js",async()=>{
//		jsDo();
//	})
//	gulp.watch("./src/php/**/*",async()=>{
//		phpDo();
//	})
//	gulp.watch("./src/img/**/*",async()=>{
//		imgDo();
//	})
//	gulp.watch("./src/scss/*.scss",async()=>{
//		scssDo();
//	}
//})



//gulp.task("copy-all",async ()=>{
//	gulp.src("./src/**/*").pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan"));
//});
//
//gulp.task("default",async()=>{
//	gulp.watch("./src/scss/*.scss",async()=>{
//		gulp.src("./src/scss/*.scss")
//		.pipe(sass())
//		.pipe(gulp.dest("D:\\phpstudy_pro\\WWW\\juhuasuan\\css"));
//	})
	
