//
//  CDVChat.m
//  JajaReg
//
//  Created by gaozhifei on 15/6/24.
//
//

#import "CDVChat.h"

#import  "WXApi.h"

#import <TencentOpenAPI/TencentOAuth.h>
#import "TencentOpenAPI/QQApiInterface.h"

@interface CDVChat () <WXApiDelegate,TencentSessionDelegate>
{
    TencentOAuth *_tencentOAuth;
}
@end

@implementation CDVChat

#pragma mark --- 重写父类方法
- (CDVPlugin *)initWithWebView:(UIWebView *)theWebView
{
    self = (CDVChat *)[super initWithWebView:theWebView];
    return self;
}

- (void)tencentDidLogin
{
    NSLog(@"登录");
}

- (void)tencentDidNotLogin:(BOOL)cancelled
{
    NSLog(@"没有登录");
}

- (void)tencentDidNotNetWork
{
    NSLog(@"网络没有连接");
}

// onReq是微信终端向第三方程序发起请求，要求第三方程序响应。第三方程序响应完后必须调用sendRsp返回。在调用sendRsp返回时，会切回到微信终端程序界面。
- (void)onReq:(BaseReq *)req
{
    NSLog(@"001");
}

// 如果第三方程序向微信发送了sendReq的请求，那么onResp会被回调。sendReq请求调用后，会切到微信终端程序界面。
- (void)onResp:(BaseResp *)resp
{
    NSLog(@"002");
}


#pragma mark --- 发送Text消息给微信
- (void)sendWeChat:(CDVInvokedUrlCommand *)command {
    self.callbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    NSString* message = [command.arguments objectAtIndex:0];
    
    if (message != nil && [message length] > 0)
    {
        SendMessageToWXReq* req = [[SendMessageToWXReq alloc] init];
        req.text = message;
        req.bText = YES;
        req.scene = WXSceneSession;
        [WXApi sendReq:req];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"发送成功!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
    else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"发送失败!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
}

#pragma mark --- 发送Text消息给QQ
- (void)sendQQ:(CDVInvokedUrlCommand *)command {
    self.callbackID = command.callbackId;
    CDVPluginResult *pluginResult = nil;
    NSString* message = [command.arguments objectAtIndex:0];
    if (message != nil && [message length] > 0)
    {
        _tencentOAuth = [[TencentOAuth alloc]initWithAppId:@"222222" andDelegate:self];
        _tencentOAuth.redirectURI = @"www.qq.com";
        
        QQApiTextObject *txtObj = [QQApiTextObject objectWithText:message];
        SendMessageToQQReq *req = [SendMessageToQQReq reqWithContent:txtObj];
        //将内容分享到qq
        //QQApiSendResultCode sent = [QQApiInterface sendReq:req];
        [QQApiInterface sendReq:req];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"发送成功!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
    else{
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"发送失败!"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
}

@end
