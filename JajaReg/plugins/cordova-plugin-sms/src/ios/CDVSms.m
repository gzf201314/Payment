//
//  CDVSms.m
//  JajaReg
//
//  Created by gaozhifei on 15/6/17.
//
//

#import <Cordova/CDV.h>
#import "CDVSms.h"

#import  "WXApi.h"
#import <TencentOpenAPI/TencentOAuth.h>
#import "TencentOpenAPI/QQApiInterface.h"

@interface CDVSms () <MFMessageComposeViewControllerDelegate,WXApiDelegate,TencentSessionDelegate>
{
    TencentOAuth *_tencentOAuth;
}
@end

@implementation CDVSms

#pragma mark --- 重写父类方法
- (CDVPlugin *)initWithWebView:(UIWebView *)theWebView
{
    self = (CDVSms *)[super initWithWebView:theWebView];
    return self;
}

-(BOOL) shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation{
    return (toInterfaceOrientation == UIInterfaceOrientationMaskPortrait);
}

- (void)stringWithCopy:(CDVInvokedUrlCommand *)command
{
    // 使用后台线程
    [self.commandDelegate runInBackground:^{
        
        CDVPluginResult* pluginResult = nil;
        // 接收到的值
        NSString *txtCopy = [command.arguments objectAtIndex:0];
        NSLog(@"复制字符串:%@",txtCopy);
        if (txtCopy != nil && [txtCopy length] > 0) {
            
            // 粘贴板
            UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
            [pasteboard setString:txtCopy];
            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"复制成功"];
        }
        else{
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark --- 实现委托方法
- (void)messageComposeViewController:(MFMessageComposeViewController *)controller didFinishWithResult:(MessageComposeResult)result
{
    // Notifies users about errors associated with the interface
    int webviewResult = 0;
    NSString *resultString;
    switch (result)
    {
        case MessageComposeResultCancelled:
            webviewResult = 0;
            resultString = @"取消发送";
            NSLog(@"Result: SMS sending canceled");
            break;
        case MessageComposeResultSent:
            webviewResult = 1;
            resultString = @"已发送";
            NSLog(@"Result: SMS sent");
            break;
        case MessageComposeResultFailed:
            webviewResult = 2;
            resultString = @"发送失败";
            NSLog(@"Result: SMS sending failed");
            break;
        default:
            webviewResult = 3;
            NSLog(@"Result: SMS not sent");
            break;
    }
    
    [self.viewController dismissViewControllerAnimated:YES completion:^{
        
        CGRect startRect = [self.webView bounds];
        
        NSLog(@"结束时:%d",(int)startRect.size.height);
    }];
    
    CDVPluginResult *pluginResult = nil;
    
    if (webviewResult == 1) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:resultString];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
    else
    {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.callbackID];
    }
}

#pragma mark --- 发送方法
- (void)sendSMS:(CDVInvokedUrlCommand *)command
{
    self.callbackID = command.callbackId;
    // 使用线程
    [self.commandDelegate runInBackground:^{
        
        NSLog(@"开始时:%d",(int)[self.webView bounds].size.height);
        // 接收到的值
        NSMutableArray *recipients = [command.arguments objectAtIndex:0];
        NSString* message = [command.arguments objectAtIndex:1];
        
        if ([MFMessageComposeViewController canSendText]) {
            [self displaySMSRecipients:recipients message:message];
        }
        else{
            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"" message:@"设备不支持短信功能" delegate:self cancelButtonTitle:@"确定" otherButtonTitles:nil];
            [alert show];
        }
    }];
}


#pragma mark --- 显示短信发送界面
- (void)displaySMSRecipients:(NSMutableArray *)recipients message:(NSString *)message{
    MFMessageComposeViewController *picker = [[MFMessageComposeViewController alloc]init];
    
    if (!picker)  return;
    
    picker.messageComposeDelegate = self;
    picker.navigationBar.tintColor = [UIColor blackColor];
    
    
    if (message != nil && [message length] > 0)
    {
        picker.body = message;
    }
    
    if (recipients != nil) {
        
        if ([recipients.firstObject isEqual: @""]) {
            [recipients replaceObjectAtIndex:0 withObject:@"?"];
        }
        picker.recipients = recipients;
    }
    
    /*
     if ([self respondsToSelector:@selector(presentViewController:animated:completion:)]) {
     [self presentViewController:aSelect animated:YES completion:nil]; // ios 5 and 以上
     }else{
     [self presentModalViewController:aSelect animated:YES]; // ios 4 and 以下
     }
     */
    // Application tried to present a nil modal view controller on target <ViewController: 0x7fa7baf94d20>.
    // 解决方法:http://www.tuicool.com/articles/NjUbu2q
    
    [self.viewController presentViewController:picker animated:YES completion:^{
        // 这里更改webview的大小
        CGRect rect = [self.webView bounds];
        rect.origin.y = 20;
        rect.size.height = rect.size.height + 20;
        self.webView.frame = rect;
        NSLog(@"等待中:%d",(int)rect.size.height);
    }];
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
