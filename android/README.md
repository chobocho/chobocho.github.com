# Android

# 1.1 Gradle
# 1.1.1 Version name auto update script
```
android {
    compileSdkVersion 29
    buildToolsVersion "29.0.3"

    def versionPropsFile = file('versioninfo.properties')
    def Properties versionInfo = new Properties()

    if (versionPropsFile.canRead()) {
        versionInfo.load(new FileInputStream(versionPropsFile))
    } else {
        versionInfo['VERSION_HEADER'] = "0.1105"
        versionInfo['VERSION_NUMBER'] = 0
        versionInfo['VERSION_COUNT'] = 0
        versionInfo['BUILD_COUNT'] = 0
    }

    def versionHeader = versionInfo['VERSION_HEADER']
    def versionNubmer = versionInfo['VERSION_NUMBER'].toInteger()
    def versionCount = versionInfo['VERSION_COUNT'].toInteger()
    def buildCount = versionInfo['BUILD_COUNT'].toInteger()

    def taskName = gradle.startParameter.taskNames
    def addVersion = 1
    def isReleaseVersion = false

    if (":app:bundleRelease" in taskName) {
        println '---[bundleRelease]---'
        versionNubmer += addVersion
        versionCount += addVersion
        isReleaseVersion = true
    }

    buildCount += addVersion

    versionInfo['VERSION_HEADER'] = versionHeader.toString()
    versionInfo['VERSION_NUMBER'] = versionNubmer.toString()
    versionInfo['VERSION_COUNT'] = versionCount.toString()
    versionInfo['BUILD_COUNT'] = isReleaseVersion ? "1" : buildCount.toString()

    versionInfo.store(versionPropsFile.newWriter(), null)

    def date = new Date();
    def alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    def thisYear =  alphabet.charAt(date.getYear() + 1900 - 2001)
    def thisMonth = alphabet.charAt(date.getMonth())
	def monthVersion = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(versionCount)

    println '-------------------'
    println taskName
    println "${versionHeader}.${thisYear}${thisMonth}${monthVersion}.${buildCount}"
    println '-------------------'

    defaultConfig {
        applicationId "com.chobocho.ColorMatch"
        minSdkVersion 23
        targetSdkVersion 28
        versionCode versionNubmer
        versionName "${versionHeader}.${thisYear}${thisMonth}${monthVersion}.${buildCount}"
        setProperty("archivesBaseName", "imagematch_$versionName")
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```